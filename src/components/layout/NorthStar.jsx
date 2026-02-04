import useStore from '../../store/useStore';

export default function NorthStar() {
  const { getCurrentProject } = useStore();
  const project = getCurrentProject();

  if (!project) return null;

  const { problemOneLiner, solutionOneLiner, audienceOneLiner } = project.profile;

  return (
    <div className="north-star-bar">
      <div className="north-star-box">
        <div className="north-star-box-label">🎯 Problem We Solve</div>
        <div className="north-star-box-value">
          {problemOneLiner || <span className="empty">Not defined yet</span>}
        </div>
      </div>
      <div className="north-star-box">
        <div className="north-star-box-label">💡 Solution We Offer</div>
        <div className="north-star-box-value">
          {solutionOneLiner || <span className="empty">Not defined yet</span>}
        </div>
      </div>
      <div className="north-star-box">
        <div className="north-star-box-label">👥 Audience We Serve</div>
        <div className="north-star-box-value">
          {audienceOneLiner || <span className="empty">Not defined yet</span>}
        </div>
      </div>
    </div>
  );
}
